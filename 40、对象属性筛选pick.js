const pick = (obj, ...props) => {
    console.log(props)
    Object.fromEntries(
        Object.entries(obj).filter(([key]) => {
            console.log(key);
            props.includes(key)
        })
    )
}

// test
console.log(pick({ 'a': 1, 'b': 2, c: 3 }, 'a', 'b'));