function App() {
  const [data, setData] = React.useState(null);
  return (
    <>
      {
        data ? <div>{ data }</div> : <div> Data wasn't provided</div> // imperative if statement inside of JSX
      }
    </>
  );
}