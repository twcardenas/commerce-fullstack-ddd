import logo from './logo.svg';
import './App.css';
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from 'react';

const TODOS_QUERY = gql`
{
  test
}
`
function App() {
  const { loading, data, error } = useQuery(TODOS_QUERY);
  if(loading) return <p>Loading</p>
  if(error) return <p>error</p>
  return (
    <div className="App">
      {
        JSON.stringify(data, null, 4)
      }
      <Subs />
    </div>
  );
}
const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded {
    orders {
      mutation
      data {
        orderNumber
      }
    }
  }
`;
function Subs() {
  const { data, loading } = useSubscription(
    COMMENTS_SUBSCRIPTION
  );

  const [orders, setOrders] = useState([]);
  
  useEffect(() =>{
    console.log({data})
    if(data !== undefined) {
      setOrders(prevState => {
        return [
          ...prevState, data.orders,
        ]
      })
    }
  }, [data, data?.orders.data[0].orderNumber])
  return (
    <div>
      {
        orders.map(order => <pre>{JSON.stringify(order, null, 4)}</pre>)
      }
    </div>
  )

}

export default App;
