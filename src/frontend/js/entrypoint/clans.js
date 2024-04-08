import { DataTable } from 'simple-datatables'
import axios from 'axios'
import 'simple-datatables/dist/style.css'

axios
    .get('/data/clans.json')
    .then((response) => {
        document.querySelector('.spinner').remove()
        const dataTable = new DataTable('#clan-table', {
            perPageSelect: null,
            data: {
                headings: ['TAG', 'NAME', 'LEADER', 'POPULATION'],
                data: response.data.map((item) => {
                    return [
                        item.tag,
                        item.name,
                        item.leaderName,
                        item.population,
                    ]
                }),
            },
        })

        dataTable.on('datatable.selectrow', (rowIndex, event) => {
            if (typeof rowIndex === 'number') {
                event.preventDefault()
                window.location.href =
                    '/clans/view/' + response.data[rowIndex].id
            }
        })
    })
    .catch((error) => {
        document.querySelector('.spinner').remove()
        const header = document.querySelector('h1')
        const errorElement = document.createElement('h2')
        errorElement.textContent =
            'Failed to load clans. Please try again later'

        console.error(error)
        header.insertAdjacentElement('afterend', errorElement)
    })
