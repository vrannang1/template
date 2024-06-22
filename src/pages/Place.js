import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PlaceDetails from "../components/PlaceDetails";
import PlaceBookings from "../components/PlaceBookings";
import PlaceReviews from "../components/PlaceReviews";

const GET_PLACE_QUERY = gql`
  query GetPlace($slug: String!) {
    place(slug: $slug) {
      id
      slug
      name
      location
      image
      description
      pricePerNight
      maxGuests
      wifi
      pool
      petFriendly
      bookings {
        id
        startDate
        endDate
        totalPrice
      }
      reviews {
        id
        comment
        rating
        insertedAt
        user {
          username
        }
      }
    }
  }
`;

export default function Place() {

  const params = useParams();

  console.log(params);

  const slug = params.slug;

  const { loading, error, data, subscribeToMore } = useQuery(GET_PLACE_QUERY, {
    variables: { slug: slug },
    fetchPolicy: "network-only"
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="place">
      <PlaceDetails place={data.place} />
      <PlaceBookings
        place={data.place}
        subscribeToBookingChanges={subscribeToMore}
      />
      <PlaceReviews place={data.place} />
    </div>
  );
};

export { GET_PLACE_QUERY };
