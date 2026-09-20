from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components


st.set_page_config(
    page_title="China Going Global Tracker",
    page_icon="🌏",
    layout="wide",
)

dashboard_path = Path(__file__).parent / "dashboard" / "index.html"

if not dashboard_path.exists():
    st.error("Dashboard HTML file was not found.")
    st.stop()

dashboard_html = dashboard_path.read_text(encoding="utf-8")

components.html(
    dashboard_html,
    height=1200,
    scrolling=True,
)
