const LoadingComponent: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingComponent;
