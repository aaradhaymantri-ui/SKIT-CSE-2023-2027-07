import React from "react";
import "../styles/Dashboard.css";

function FactBox(){
    return(
        <div className="fact-box">
            <h3>💡 Fact of the Day</h3>
            <p>
                <span className="fact-ticker">
                    Solar panels can generate electricity for 25+ years. &nbsp; • &nbsp;
                    Planting trees helps reduce atmospheric CO₂. &nbsp; • &nbsp;
                    Recycling aluminum saves up to 95% of energy vs new production. &nbsp; • &nbsp;
                    Turning off lights saves energy and reduces emissions. &nbsp; • &nbsp;
                </span>
                <span className="fact-ticker" aria-hidden="true">
                    Solar panels can generate electricity for 25+ years. &nbsp; • &nbsp;
                    Planting trees helps reduce atmospheric CO₂. &nbsp; • &nbsp;
                    Recycling aluminum saves up to 95% of energy vs new production. &nbsp; • &nbsp;
                    Turning off lights saves energy and reduces emissions. &nbsp; • &nbsp;
                </span>
            </p>
        </div>
    );
}

export default FactBox;