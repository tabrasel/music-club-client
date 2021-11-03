import styles from './CurrentRoundJumbotron.module.css';

function CurrentRoundJumbotron() {
  return (
    <div className={`${styles.CurrentRoundJumbotron} jumbotron mb-5 p-4`}>
      <h2 className="m-0">Now playing</h2>
      <h1>Round 26</h1>
    </div>
  );
}

export default CurrentRoundJumbotron;
