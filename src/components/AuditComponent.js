import React from "react";
import PropTypes from "prop-types";

function AuditComponent({
  financialReports = [],
  relatedParty,
  captialLease,
  operatingLease,
  managementAgreement,
  bond
}) {
  if (financialReports.length === 0) {
    return <div></div>;
  }
  const latest = financialReports[financialReports.length - 1];
  let fontClass = {
    Closed: "text-info",
    Cancelled: "text-warning",
    Open: "text-secondary",
    Awarded: "text-success",
    Upcoming: "text-primary",
  }["Cancelled"];
  return (
    <div className="p-4">
      <strong className={"d-inline-block mb-2 "}>{latest.year}</strong>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={
          "https://reporting.auditor.utah.gov/servlet/servlet.FileDownload?file=" +
          latest.reportFile
        }
      >
        <h3 className="mb-0">Financial Report</h3>
      </a>
      {bond && (
        <div className="mb-2">
          <strong className={"mb-2 text-secondary"}>Bond</strong>
          <p className="card-text mb-auto">  
          Utah charter schools may finance their long-term capital needs through access to the tax-exempt bond market.
          </p>
          <div className="float-sm-right pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ucsfa.utah.gov/"
              className="stetched-link"
            >
              Source
            </a>
          </div>
        </div>
      )}
      {managementAgreement && (
        <div className="mb-2">
          <strong className={"mb-2 text-danger"}>{managementAgreement !== true ? managementAgreement+ " " :""}Management Agreement</strong>
          <p className="card-text mb-auto">  
            Fifty-four percent of charter schools contract with a professional
            management company to fulfill administrative reporting requirements.
            Professional management companies are contracted to handle
            administrative responsibilities for charter schools, including
            reporting responsibilities.
          </p>
          <div className="float-sm-right pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://le.utah.gov/audit/19_14rpt.pdf"
              className="stetched-link"
            >
              Source
            </a>
          </div>
        </div>
      )}
      {captialLease && (
        <div className="mb-2">
          <strong className={"mb-2 text-info"}>Capital Lease</strong>
          <p className="card-text mb-auto">
            The Charter School may lease its building from developers and have
            the option to buy it later.{" "}
          </p>
          <div className="float-sm-right pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.diffen.com/difference/Capital_Lease_vs_Operating_Lease"
              className="stetched-link"
            >
              Source
            </a>
          </div>
        </div>
      )}
      {operatingLease && (
        <div className="mb-2">
          <strong className={"mb-2 text-info"}>Operating Lease</strong>
          <p className="card-text mb-auto">
            The Charter School may rent equipment or its building from developers .{" "}
          </p>
          <div className="float-sm-right pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.diffen.com/difference/Capital_Lease_vs_Operating_Lease"
              className="stetched-link"
            >
              Source
            </a>
          </div>
        </div>
      )}
      {relatedParty && (
        <div className="mb-2">
          <strong className={"mb-2 " + fontClass}>
            Related Party Transactions
          </strong>
          <p className="card-text mb-auto">
            During an external financial audit, the auditors may particularly
            scrutinize related-party transactions. These transactions aren’t
            bad, necessarily, but they do raise concerns about the risk of
            misstatement or omission in financial reports.
          </p>
          <div className="float-sm-right pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://weaver.com/blog/whats-risk-related-party-transactions#:~:text=During%20an%20external%20financial%20audit,or%20omission%20in%20financial%20reports."
              className="stetched-link"
            >
              Source
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

AuditComponent.propTypes = {
  financialReports: PropTypes.array,
  relatedParty: PropTypes.bool,
  captialLease: PropTypes.bool,
  name: PropTypes.string,
};

export default AuditComponent;
