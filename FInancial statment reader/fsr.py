from flask import Flask, render_template, request
import yfinance as yf

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    query = request.args.get('query')
    company_data = None

    if query:
        query = query.upper()
        print(f"Received query: {query}")  
        try:
            ticker = yf.Ticker(query)
            info = ticker.info
            company_data = {
                "company_name": info.get("shortName", "N/A"),
                "market_cap": str(float(info.get("marketCap", "N/A"))/1000000000)+"B",
                "pe_ratio": info.get("trailingPE", "N/A"),
                "roe": info.get("returnOnEquity", "N/A"),
                "debt_to_equity": info.get("debtToEquity", "N/A"),
                "p_b_ratio": info.get("priceToBook", "N/A")
            }
            print(f"Company data fetched: {company_data}") 
        except Exception as e:
            print(f"Error fetching data for {query}: {e}")

    return render_template('index.html', company_data=company_data)

if __name__ == "__main__":
    app.run(debug=True)