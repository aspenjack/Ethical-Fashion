--country_summary
create table country_summary (
    Country varchar(100) primary key,
    Overall_Mean numeric not null,
    Sustainable_Sourcing_Mean numeric not null,
    Overconsumption_Mean numeric not null,
    Deforestation_Mean numeric not null,
    Fair_Wages_Mean numeric not null
);

--company_cleaned_df
create table company_country (
    Company varchar(80) primary key,
    ID int not null,
    State varchar(50),
    Country varchar(100) not null,
    foreign key (Country) references country_summary (Country),
    foreign key (Company) references company_metric (Company)
);

--cleaned_df
--can't have foreign key to company country because not all companies exist 
create table company_metric (
    Company varchar(80) not null,
    Year int not null,
    Value numeric not null,
    Metric varchar(400) not null,
    primary key (Company, Metric)
);


--combined_df
create table company_scores (
    Company varchar(80),
    Year int not null,
    Value numeric not null,
    Metric varchar (400),
    ID int not null,
    State varchar(50),
    Country varchar(100),
    primary key (Metric, Company),
    foreign key (Company) references company_country(Company)
);

--company_summary
create table company_summary (
    Company varchar(80) primary key,
    Overall_Mean numeric not null,
    Sustainable_Sourcing_Mean numeric not null,
    Overconsumption_Mean numeric not null,
    Deforestation_Mean numeric not null,
    Fair_Wages_Mean numeric not null,
    foreign key (Company) references company_country(Company)
);
