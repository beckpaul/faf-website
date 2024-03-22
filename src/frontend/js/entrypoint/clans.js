import { DataTable } from 'simple-datatables'
import axios from 'axios'
import 'simple-datatables/dist/style.css'

async function getClans() {
    const response = await axios.get('/data/clans.json')
    if (response.status !== 200 || !response.data || !response.data.length) {
        throw new Error('Could not retrieve clans')
    }

    return response.data
}

getClans().then((res) => {
    const dataTable = new DataTable('#clan-table', {
        perPageSelect: null,
        data: {
            headings: ['TAG', 'NAME', 'LEADER', 'POPULATION'],
            data: res.map((item) => {
                return [item.tag, item.name, item.leaderName, item.population]
            }),
        },
    })

    dataTable.on('datatable.selectrow', (rowIndex, event) => {
        if (typeof rowIndex === 'number') {
            event.preventDefault()
            window.location.href = '/clans/view/' + res[rowIndex].id
        }
    })
})
