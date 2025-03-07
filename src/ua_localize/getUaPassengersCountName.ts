const getUaPassengersCountName = (count: number) => {
    switch (count % 10) {
        case 1:
            switch (count) {
                case 1:
                    return "дорослий";
                case 11:
                    return "осіб";
                default:
                    return "особа";
            }
        case 2:
        case 3:
        case 4:
            switch (count) {
                case 12:
                case 13:
                case 14:
                    return "осіб";
                default:
                    return "особи";
            }
        default:
            return "осіб";
    }
}

export default getUaPassengersCountName;
