import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'
import { BookingItem } from 'views/HomePage'
import { Popover, Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Container } from './Container'
import { SecondaryButton } from './Buttons'

type InterfellTableProps = {
  data: BookingItem[]
}

const SearchIcon = styled(SearchOutlined)({
  marginLeft: 5,
})

const TableContainer = styled(Container)({
  flexDirection: 'column',
})

const PopoverButton = styled(Button)({
  marginInline: 3,
})

const PopoverButtonContainer = styled.div({
  display: 'inline-flex',
  justifyContent: 'center',
  marginTop: 10,
})

export const InterfellTable: React.FC<InterfellTableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<BookingItem[]>(data)
  const [visible, setVisible] = useState(true)
  const [currentFilter, setCurrentFilter] = useState('')
  const [currentFilterValue, setCurrentFilterValue] = useState('')

  const columns = React.useMemo(
    () => [
      {
        Header: 'BookingId',
        accessor: 'bookingId' as const,
      },
      {
        Header: 'Cliente',
        accessor: 'client' as const,
      },
      {
        Header: 'Fecha de Creación',
        accessor: 'bookingTime' as const,
      },
      {
        Header: 'Dirección',
        accessor: 'streetAddress' as const,
      },
      {
        Header: 'Precio',
        accessor: 'bookingPrice' as const,
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }

  const hide = () => {
    setVisible(false)
  }

  const reset = () => {
    setTableData(data)
  }

  const findByValue = (type: 'bookingId' | 'bookingPrice') => {
    setTableData(
      data.filter(el => el[type] === parseInt(currentFilterValue, 10)),
    )
    setCurrentFilterValue('')
    hide()
  }

  const filterByLessThan = (
    type: 'bookingId' | 'bookingPrice',
    lessThan: boolean,
  ) => {
    if (currentFilterValue) {
      if (lessThan) {
        setTableData(
          data.filter(el => parseInt(currentFilterValue, 10) >= el[type]),
        )
      } else {
        setTableData(
          data.filter(el => parseInt(currentFilterValue, 10) <= el[type]),
        )
      }
      setCurrentFilterValue('')
    }
    hide()
  }

  useEffect(() => {
    setTableData(data)
  }, [data])
  return (
    <TableContainer>
      <SecondaryButton onClick={reset}>RESET FILTERS</SecondaryButton>
      <br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {column.id === 'bookingId' && (
                    <Popover
                      content={
                        <TableContainer>
                          <Input
                            type="number"
                            size="small"
                            value={currentFilterValue}
                            onChange={e =>
                              setCurrentFilterValue(e.target.value)
                            }
                            placeholder="Ingresa un numero"
                            maxLength={25}
                          />
                          <PopoverButtonContainer>
                            <PopoverButton
                              size="small"
                              type="primary"
                              onClick={() => findByValue('bookingId')}
                            >
                              Buscar <SearchOutlined />
                            </PopoverButton>
                            <PopoverButton
                              size="small"
                              onClick={() =>
                                filterByLessThan('bookingId', false)
                              }
                            >
                              {'>'}
                            </PopoverButton>
                            <PopoverButton
                              size="small"
                              onClick={() =>
                                filterByLessThan('bookingId', true)
                              }
                            >
                              {'<'}
                            </PopoverButton>
                            <PopoverButton
                              size="small"
                              type="link"
                              onClick={hide}
                            >
                              Cerrar
                            </PopoverButton>
                          </PopoverButtonContainer>
                        </TableContainer>
                      }
                      title="Filtrar por BookingID"
                      trigger="click"
                      visible={visible && currentFilter === 'bookingId'}
                      onVisibleChange={handleVisibleChange}
                    >
                      <SearchIcon
                        onClick={() => setCurrentFilter('bookingId')}
                      />
                    </Popover>
                  )}
                  {column.id === 'bookingPrice' && (
                    <Popover
                      content={
                        <TableContainer>
                          <Input
                            type="number"
                            size="small"
                            value={currentFilterValue}
                            onChange={e =>
                              setCurrentFilterValue(e.target.value)
                            }
                            placeholder="Input a number"
                            maxLength={25}
                          />
                          <PopoverButtonContainer>
                            <PopoverButton
                              size="small"
                              type="primary"
                              onClick={() => findByValue('bookingPrice')}
                            >
                              Buscar <SearchOutlined />
                            </PopoverButton>
                            <PopoverButton
                              size="small"
                              onClick={() =>
                                filterByLessThan('bookingPrice', false)
                              }
                            >
                              {'>'}
                            </PopoverButton>
                            <PopoverButton
                              size="small"
                              onClick={() =>
                                filterByLessThan('bookingPrice', true)
                              }
                            >
                              {'<'}
                            </PopoverButton>
                            <PopoverButton
                              size="small"
                              type="link"
                              onClick={hide}
                            >
                              Cerrar
                            </PopoverButton>
                          </PopoverButtonContainer>
                        </TableContainer>
                      }
                      title="Filtrar por BookingPrice"
                      trigger="click"
                      visible={visible && currentFilter === 'bookingPrice'}
                      onVisibleChange={handleVisibleChange}
                    >
                      <SearchIcon
                        onClick={() => setCurrentFilter('bookingPrice')}
                      />
                    </Popover>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableContainer>
  )
}
