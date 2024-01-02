const Triangle = (props) => {
    return (
        <div
            style={{
                content: "",
                position: "absolute",
                bottom: "-2vh",
                left: props.isOwnMessage ? "calc(100% - 30px)" : 10,
                borderWidth: props.isOwnMessage ? "15px 15px 0" : "15px 15px 0 ",
                borderStyle: "solid",
                borderColor: `${props.color} transparent`,
            }}
        />
    );
};
export default Triangle;