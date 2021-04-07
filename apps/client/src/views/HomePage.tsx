import React, { useEffect, useState } from 'react'
import { Container } from 'components/Container'
import { userInitialValues, useStore } from 'lib/State'
import { BookingObject } from 'lib/types/BookingObject'
import styled from '@emotion/styled'
import { PrimaryButton } from 'components/Buttons'

import { Table } from 'components/Table'
import { format, toDate } from 'date-fns'
import { APP_URL, TUTEN_APP_TYPE, TUTEN_ENDPOINT } from 'env'

const contactEmail = 'contacto@tuten.cl'

export type BookingItem = {
  key: number
  client: string
  bookingTime: string
  bookingPrice: number
  bookingId: number
  streetAddress: string
}

const PageContainer = styled(Container)({
  padding: 15,
  flexDirection: 'column',
})

const TableContainer = styled.div({
  margin: 'auto',
})

export const HomePage = () => {
  const Store = useStore()
  const [booking, setBookings] = useState<BookingItem[]>([])

  useEffect(() => {
    const getBooking = async () => {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Origin', APP_URL)
      headers.append('app', TUTEN_APP_TYPE)
      headers.append('adminemail', Store.user.email)
      headers.append('token', Store.user.sessionTokenBck)
      try {
        const response = await fetch(
          `${TUTEN_ENDPOINT}${contactEmail}/bookings?current=true`,
          {
            headers,
            method: 'GET',
          },
        )
        if (response.status === 200) {
          const bookingResponse: BookingObject[] = await response.json()
          const parsedBooking = bookingResponse.map((booking, index) => ({
            key: index,
            client: `${booking.tutenUserClient.firstName} ${booking.tutenUserClient.lastName}`,
            bookingTime: format(toDate(booking.bookingTime), 'dd MMM yyyy'),
            bookingPrice: booking.bookingPrice,
            bookingId: booking.bookingId,
            streetAddress: booking.locationId.streetAddress,
          }))
          setBookings(parsedBooking)
        } else {
          console.log('400')
        }
      } catch (error) {
        console.log('error')
      }
    }
    getBooking()
  }, [])
  return (
    <PageContainer>
      <TableContainer>
        <Table data={booking} />
      </TableContainer>
      <PrimaryButton onClick={() => Store.setUser(userInitialValues)}>
        LOG OUT
      </PrimaryButton>
    </PageContainer>
  )
}
