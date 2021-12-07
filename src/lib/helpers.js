//유효성 검증
const isArrayNull = (array) => {
    return array.length === 0
}

const handleNullObj = (obj) => {
    return obj || {}
}

export { isArrayNull, handleNullObj }