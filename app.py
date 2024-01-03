# 1. import dependencies
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
from flask_cors import CORS

from postgres import username, password, hostname, port
database = 'Ethical_Fashion'

#Setup Database
conn = create_engine(f"postgresql+psycopg2://{username}:{password}@{hostname}:{port}/{database}")

Base = automap_base()
Base.prepare(autoload_with=conn)

country_summary = Base.classes.country_summary
company_country = Base.classes.company_country
company_scores = Base.classes.company_scores
company_summary = Base.classes.company_summary
company_metric = Base.classes.company_metric
company_overall_mean = Base.classes.company_overall_mean

# Create a link from Python to DB
session = Session(conn)

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
CORS(app)


# 3. Define what to do when a user hits the index route
@app.route("/api")
def api():
    return (
        "Welcome to my 'Home' page! <br/>"
        f"/api/v1.0/company_summary <br/>"
        f"/api/v1.0/company_country <br/>"
        f"/api/v1.0/company_scores <br/>"
        f"/api/v1.0/country_summary <br/>"
        f"/api/v1.0/company_metric <br/>"
        f"/api/v1.0/company_overall_mean <br/>"
            )

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/map")
def map ():
    return render_template('holt.html')


# 4. Define what to do when a user hits the /about route
@app.route("/api/v1.0/company_summary")
def com_summary():
    session = Session(conn)
    summary = session.query(company_summary.company,
                            company_summary.overall_mean,
                            company_summary.sustainable_sourcing_mean,
                            company_summary.overconsumption_mean,
                            company_summary.deforestation_mean,
                            company_summary.fair_wages_mean
                            ).all()
 
    session.close()
    all_names = []
 
    for company, overall_mean, sustainable_sourcing_mean, overconsumption_mean,deforestation_mean, fair_wages_mean in summary:
        company_summ_dict = {}
        company_summ_dict["company"] = company
        company_summ_dict["overall_mean"] = float(overall_mean)
        company_summ_dict["sustainable_sourcing_mean"] = float(sustainable_sourcing_mean)
        company_summ_dict["overconsumption_mean"] = float(overconsumption_mean)
        company_summ_dict["deforestation_mean"] = float(deforestation_mean)
        company_summ_dict["fair_wages_mean"] = float(fair_wages_mean)
        
        all_names.append(company_summ_dict)

    return jsonify(all_names)

@app.route("/api/v1.0/country_summary")
def cou_summary():
    session = Session(conn)
    summary = session.query(country_summary.country,
                            country_summary.overall_mean,
                            country_summary.sustainable_sourcing_mean,
                            country_summary.overconsumption_mean,
                            country_summary.deforestation_mean,
                            country_summary.fair_wages_mean
                            ).all()
 
    session.close()
    all_names = []
 
    for country, overall_mean, sustainable_sourcing_mean, overconsumption_mean,deforestation_mean, fair_wages_mean in summary:

        country_summ_dict = {}
        country_summ_dict["country"] = country
        country_summ_dict["overall_mean"] = float(overall_mean)
        country_summ_dict["sustainable_sourcing_mean"] = float(sustainable_sourcing_mean)
        country_summ_dict["overconsumption_mean"] = float(overconsumption_mean)
        country_summ_dict["deforestation_mean"] = float(deforestation_mean)
        country_summ_dict["fair_wages_mean"] = float(fair_wages_mean)
        
        all_names.append(country_summ_dict)
        
    return jsonify(all_names)

@app.route("/api/v1.0/company_scores")
def com_scores():
    session = Session(conn)
    summary = session.query(company_scores.company,
                            company_scores.year,
                            company_scores.value,
                            company_scores.metric,
                            company_scores.id,
                            company_scores.state,
                            company_scores.country
                            ).all()

    session.close()
    all_names = []

    for company, year, value, metric, id, state, country in summary:

        company_scores_dict = {}
        company_scores_dict["company"] = company
        company_scores_dict["year"] = int(year)
        company_scores_dict["value"] = float(value)
        company_scores_dict["metric"] = metric
        company_scores_dict["id"] = int(id)
        company_scores_dict["state"] = state
        company_scores_dict["country"] = country
        
        all_names.append(company_scores_dict)
        
    return jsonify(all_names)

@app.route("/api/v1.0/company_country")
def com_cou():
    session = Session(conn)
    summary = session.query(company_country.company,
                            company_country.id,
                            company_country.state,
                            company_country.country
                            ).all()

    session.close()
    all_names = []

    for company, id, state, country in summary:

        company_country_dict = {}
        company_country_dict["company"] = company
        company_country_dict["id"] = int(id)
        company_country_dict["state"] = state
        company_country_dict["country"] = country
        
        all_names.append(company_country_dict)
        
    return jsonify(all_names)

@app.route("/api/v1.0/company_metric")
def com_metric():
    session = Session(conn)
    summary = session.query(company_metric.company,
                            company_metric.year,
                            company_metric.value,
                            company_metric.metric
                            ).all()

    session.close()
    all_names = []
    #list(np.ravel(summary))
    for company, year, value, metric in summary:

        company_metric_dict = {}
        company_metric_dict["company"] = company
        company_metric_dict["year"] = int(year)
        company_metric_dict["value"] = float(value)
        company_metric_dict["metric"] = metric

        all_names.append(company_metric_dict)  

    return jsonify(all_names)

@app.route("/api/v1.0/company_overall_mean")
def com_loc():
    session = Session(conn)
    summary = session.query(company_overall_mean.company,
                            company_overall_mean.country,
                            company_overall_mean.latitude,
                            company_overall_mean.longitude,
                            company_overall_mean.overall_mean
                            ).all()

    session.close()
    all_names = []
    #list(np.ravel(summary))
    for company, country, latitude, longitude, overall_mean in summary:

        company_overall_dict = {}
        company_overall_dict["company"] = company
        company_overall_dict["country"] = country
        company_overall_dict["latitude"] = float(latitude)
        company_overall_dict["longitude"] = float(longitude)
        company_overall_dict["overall_mean"] = float(overall_mean)


        all_names.append(company_overall_dict)
        
    return jsonify(all_names)

if __name__ == "__main__":
    app.run(debug=True,port=5001)
