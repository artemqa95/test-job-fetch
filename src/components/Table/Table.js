const Table = props => {
    const rows = props.houses.map((house,index) => {
        return (

            <tr key={index}>
                <td>{house.id}</td>
                <td style={{textAlign:"left"}}>{house.address}</td>
                <td>{house.reestrFlatCount}</td>
                <td>{new Date(house.createdAt).toLocaleDateString()}</td>
            </tr>

        )
    })
    return (
        <div className={'Table'}>
            <table>
                <tbody>
                <tr>
                    <th>id</th>
                    <th>Адрес</th>
                    <th>Количество квартир</th>
                    <th>Дата добавления</th>
                </tr>
                {rows}
                </tbody>
            </table>
        </div>
    )
}

export default Table