const marginBtm16px = { marginBottom: "16px" };

const Image = ({ path }) => <img src={path} width="100px" height="100px" style={marginBtm16px} alt={path} />

export default Image;