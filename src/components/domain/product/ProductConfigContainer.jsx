function ProductConfigContainer({ options }) {
  return (
    <div>
      {options?.map((option) => {
        return (
          <div key={option._id}>
            <h4>{option.label}</h4>
            <ul>
              {option?.options?.map((option) => {
                return <li key={option?._id}>{option?.option?.name}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default ProductConfigContainer;
