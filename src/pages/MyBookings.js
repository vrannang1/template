import React from "react";
import { useQuery, gql } from "@apollo/client";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Booking from "../components/Booking";

const GET_MY_BOOKINGS_QUERY = gql`
  query GetMyBookings {
    me {
      bookings {
        id
        startDate
        endDate
        totalPrice
        state
        place {
          id
          name
          slug
          imageThumbnail
          pricePerNight
        }
      }
    }
  }
`;

export default function MyBookings() {
  const { loading, error, data } = useQuery(GET_MY_BOOKINGS_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
      <div className="bookings">
        <h1>My Bookings</h1>
        {data.me.bookings.map(booking => (
          <Booking key={booking.id} booking={booking} />
        ))}
      </div>
  );
};

export { GET_MY_BOOKINGS_QUERY };
