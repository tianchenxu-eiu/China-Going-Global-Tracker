from pathlib import Path
import hmac

import streamlit as st
import streamlit.components.v1 as components
from streamlit.errors import StreamlitSecretNotFoundError


st.set_page_config(
    page_title="China Going Global Tracker",
    page_icon="🌏",
    layout="wide",
)


def require_password() -> None:
    try:
        expected_password = st.secrets["APP_PASSWORD"]
    except (KeyError, StreamlitSecretNotFoundError):
        st.error("APP_PASSWORD is not configured in Streamlit Secrets.")
        st.stop()

    if st.session_state.get("authenticated"):
        return

    st.title("China Going Global Tracker")
    with st.form("login"):
        supplied_password = st.text_input("Access password", type="password")
        submitted = st.form_submit_button("Open tracker")

    if submitted:
        if hmac.compare_digest(supplied_password, expected_password):
            st.session_state["authenticated"] = True
            st.rerun()
        else:
            st.error("Incorrect password.")
    st.stop()


require_password()

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
