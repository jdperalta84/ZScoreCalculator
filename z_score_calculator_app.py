
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Z-Score Calculator", layout="centered")

st.title("📊 Z-Score Calculator")
st.write("Upload a CSV file to calculate Z-scores for selected numeric columns.")

uploaded_file = st.file_uploader("Upload your CSV file", type=["csv"])

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    st.subheader("Preview of Uploaded Data")
    st.write(df.head())

    numeric_columns = df.select_dtypes(include=["number"]).columns.tolist()
    selected_columns = st.multiselect("Select columns to calculate Z-scores", numeric_columns)

    if selected_columns:
        for col in selected_columns:
            mean = df[col].mean()
            std = df[col].std()
            df[f"{col}_zscore"] = (df[col] - mean) / std

        st.subheader("Z-Score Results")
        st.write(df)

        csv = df.to_csv(index=False).encode("utf-8")
        st.download_button("Download CSV with Z-scores", csv, "zscore_output.csv", "text/csv")
    else:
        st.info("Please select at least one numeric column.")
else:
    st.info("Awaiting CSV file upload.")
