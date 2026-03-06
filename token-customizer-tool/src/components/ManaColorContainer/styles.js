const cardStyle = {
    display: "flex",
    backgroundColor: "var(--backgound-primary)",
};

const contentStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    maxWidth: "100%",
};

const manaColorsContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    maxWidth: "100%",
};

const manaColorStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    flex: "1 1 200px",
    flexShrink: "1",
    border: "solid",
    borderColor: "var(--accent-primary)",
    borderRadius: "5px",
    padding: "1em",
    backgroundColor: "var(--backgound-secondary)",
};

const radioButtonStyle = {
    margin: "0", 
    justifyContent: "center"
};

const imageSizeStyle = { 
    maxWidth: '100%', 
    height: 'auto' 
};

export { cardStyle, contentStyle, manaColorsContainerStyle, radioButtonStyle, manaColorStyle, imageSizeStyle };