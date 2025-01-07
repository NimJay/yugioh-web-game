import './opponent-picker-div.css';

const opponents = [
  "Cimba",
  "Iyara",
];

interface OpponentPickerDivProps {
  onDuelOpponent: (opponentName: string) => void;
}

function OpponentPickerDiv(props: OpponentPickerDivProps) {
  const { onDuelOpponent } = props;
  const opponentLis = opponents.map((name) => {
    return (
      <li key={name}>
        <img src={`public/characters/${name.toLowerCase()}.jpeg`} alt={name} />
        <button onClick={() => onDuelOpponent(name)}>Duel {name}</button>
      </li>
    );
  });
  return (
    <div className={"OpponentPickerDiv"}>
      <h1>Pick an opponent</h1>
      <ol>
        {opponentLis}
      </ol>
    </div>
  );
}

export { OpponentPickerDiv };
