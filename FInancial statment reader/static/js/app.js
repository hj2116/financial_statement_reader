function searchCompany() {
    const query = document.getElementById('searchInput').value.trim();

    if (query) {
        fetch(`/search?query=${query}`)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('results').innerHTML = '<p class="error">Failed to fetch data. Please try again.</p>';
            });
    }
}

function displayResults(data) {
    if (data.error) {
        document.getElementById('results').innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <div class="result-card">
            <h3>${data.company_name}</h3>
            <div class="data-box">
                <div class="data-item">
                    <strong>Market Cap:</strong> $${data.market_cap}B <span>– Total value of the company based on its stock price.</span>
                </div>
                <div class="data-item">
                    <strong>P/E Ratio:</strong> ${data.pe_ratio} <span>– This ratio tells how many years it would take for the company's earnings to reach the current stock price. Lower is generally better.</span>
                </div>
                <div class="data-item">
                    <strong>ROE:</strong> ${data.roe}% <span>– Return on equity measures how effectively the company uses investments to generate profits. Higher is better.</span>
                </div>
                <div class="data-item">
                    <strong>Debt to Equity:</strong> ${data.debt_to_equity} <span>– Compares company debt to what it owns. A lower number indicates less reliance on debt.</span>
                </div>
                <div class="data-item">
                    <strong>Price to Book (P/B Ratio):</strong> ${data.p_b_ratio} <span>– Compares stock price to company’s actual asset value. Lower could mean undervaluation.</span>
                </div>
            </div>
        </div>
    `;
    document.addEventListener('DOMContentLoaded', function() {
        fetch('/all_companies')
            .then(response => response.json())
            .then(data => populateTable(data))
            .catch(error => console.error('Error fetching all companies data:', error));
    });
    
    function populateTable(data) {
        const tableBody = document.getElementById('companyTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';  
    
        data.forEach(company => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${company.symbol}</td>
                <td>${company.company_name}</td>
                <td>$${company.market_cap}B</td>
                <td>${company.pe_ratio}</td>
                <td>${company.roe}%</td>
                <td>${company.debt_to_equity}</td>
                <td>${company.p_b_ratio}</td>
            `;
        });
    }
}