let selectedRow = null;
let originalData = []; // To store the original state for refresh

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('chemicalTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    // Store original data for refresh
    Array.from(rows).forEach(row => {
        originalData.push(row.cloneNode(true));
    });

    // Select and highlight row
    Array.from(rows).forEach(row => {
        row.addEventListener('click', () => {
            if (selectedRow) {
                selectedRow.classList.remove('highlight');
            }
            row.classList.add('highlight');
            selectedRow = row;
        });
    });

    // Add new row
    document.querySelector('.plus-icon').addEventListener('click', () => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>✓</td>
            <td>${table.rows.length}</td>
            <td><input type="text" value="New Chemical"></td>
            <td><input type="text" value="New Vendor"></td>
            <td><input type="text" value="0.0 g/cm³"></td>
            <td><input type="text" value="0.0 cP"></td>
            <td><input type="text" value="Bottle"></td>
            <td><input type="text" value="1"></td>
            <td><input type="text" value="ml"></td>
            <td><input type="text" value="0"></td>
            <td><button class="edit-icon"><i class="fas fa-edit"></i></button></td>
        `;
    });

    // Delete selected row
    document.getElementById('deleteSelected').addEventListener('click', () => {
        if (selectedRow) {
            table.removeChild(selectedRow);
            selectedRow = null;
        } else {
            alert('Please select a row to delete.');
        }
    });

    // Edit row
    table.addEventListener('click', event => {
        if (event.target.classList.contains('fa-edit')) {
            const row = event.target.closest('tr');
            Array.from(row.cells).forEach((cell, index) => {
                if (index > 1 && index < 10) {
                    const currentValue = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${currentValue}">`;
                }
            });
            event.target.classList.replace('fa-edit', 'fa-save');
        } else if (event.target.classList.contains('fa-save')) {
            const row = event.target.closest('tr');
            Array.from(row.cells).forEach((cell, index) => {
                if (index > 1 && index < 10) {
                    const input = cell.querySelector('input');
                    cell.textContent = input.value;
                }
            });
            event.target.classList.replace('fa-save', 'fa-edit');
        }
    });

    // Sort Ascending
    document.getElementById('sortAsc').addEventListener('click', () => {
        sortTable(1, true);
    });

    // Sort Descending
    document.getElementById('sortDesc').addEventListener('click', () => {
        sortTable(1, false);
    });

    // Refresh the table to the original state
    document.getElementById('refresh').addEventListener('click', () => {
        table.innerHTML = '';
        originalData.forEach(row => {
            table.appendChild(row.cloneNode(true));
        });
    });

    // Print functionality
    document.getElementById('print').addEventListener('click', () => {
        window.print();
    });

    // Sorting function
    function sortTable(colIndex, ascending) {
        const rowsArray = Array.from(rows);
        rowsArray.sort((a, b) => {
            const aVal = a.cells[colIndex].textContent.trim().toLowerCase();
            const bVal = b.cells[colIndex].textContent.trim().toLowerCase();
            if (ascending) return aVal.localeCompare(bVal);
            else return bVal.localeCompare(aVal);
        });

        rowsArray.forEach(row => table.appendChild(row));
    }
});
