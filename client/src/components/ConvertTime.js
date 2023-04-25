const ConvertTime = (stamp) => {
    const date = new Date(stamp);
    return (
        date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()
    );
};

export default ConvertTime