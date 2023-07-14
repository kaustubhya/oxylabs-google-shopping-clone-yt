function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
        <h1 className="text-4xl font-bold">OOPS...</h1>
        <h2 className="font-extralight animate-pulse">
            I am sorry but we could not find the product you are looking for!
        </h2>
    </div>
  );
}

export default NotFound;
