const History = {
    navigate: (page: string) => {
        console.log('navigate', page);
    },
    push: (page: string) => History.navigate(page),
};

export default History;
