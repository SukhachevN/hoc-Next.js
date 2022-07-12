import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IEvent } from '../interfaces';

interface EventsProps {
  events: IEvent[];
}

const Events: NextPage<EventsProps> = ({ events = [] }) => {
  const [eventList, setEventList] = useState(events);

  const router = useRouter();

  const fetchSporstEvents = async () => {
    const response = await fetch(
      'http://localhost:4000/events?category=sports'
    );
    const result = (await response.json()) as IEvent[];
    router.push('events?category=sports', undefined, { shallow: true });
    setEventList(result);
  };

  return (
    <>
      <button onClick={fetchSporstEvents}>Sports Events</button>
      <h1>Events List</h1>
      <ul>
        {eventList.map(({ id, title, date, category, description }) => (
          <li key={id}>
            <h3>
              {id} {title} {date} | {category}
            </h3>
            <p>{description}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Events;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const queryString = query?.category ? 'category=sports' : '';
  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const events = await response.json();

  return {
    props: {
      events,
    },
  };
};
