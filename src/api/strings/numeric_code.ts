function num_code(numeric_code: string) {
  let http_code: number;
  let error_string: string;
  let error_code: string;
  let error_type: string;

  switch (numeric_code) {
    case "01":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an issue processing your payment. Please contact your bank or try again later.";
      error_code = "refer_to_issuer";
      error_type = "api_error";
      break;

    case "02":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an issue processing your payment. Please contact your bank or try again later.";
      error_code = "refer_to_issuer_special_condition";
      error_type = "api_error";
      break;

    case "03":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an issue processing your payment. Please contact support.";
      error_code = "invalid_merchant";
      error_type = "api_error";
      break;

    case "04":
      http_code = 200; // OK
      error_string = "Your payment was successful. Please pick up your card.";
      error_code = "pick_up_card_no_fraud";
      error_type = "api_error";
      break;

    case "05":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Please check with your bank or use a different card.";
      error_code = "do_not_honor";
      error_type = "card_error";
      break;

    case "06":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an internal server error. Please try again later or contact support.";
      error_code = "internal_server_error";
      error_type = "api_error";
      break;

    case "07":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined due to suspected fraud. Please contact your bank.";
      error_code = "pick_up_card_fraud";
      error_type = "card_error";
      break;

    case "10":
      http_code = 206; // Partial Content
      error_string =
        "Your payment was partially approved. Further action is required.";
      error_code = "partial_approval";
      error_type = "api_error";
      break;

    case "12":
      http_code = 400; // Bad Request
      error_string =
        "Your payment was declined. Please check the details and try again.";
      error_code = "invalid_transaction";
      error_type = "invalid_request_error";
      break;

    case "13":
      http_code = 400; // Bad Request
      error_string =
        "Your payment was declined due to an invalid amount. Please adjust and try again.";
      error_code = "invalid_amount";
      error_type = "invalid_request_error";
      break;

    case "14":
      http_code = 400; // Bad Request
      error_string =
        "Your payment was declined. Please check the account number and try again.";
      error_code = "invalid_account_number";
      error_type = "invalid_request_error";
      break;

    case "15":
      http_code = 404; // Not Found
      error_string =
        "Your payment was declined. Please check with your bank or use a different card.";
      error_code = "no_such_issuer";
      error_type = "invalid_request_error";
      break;

    case "19":
      http_code = 206; // Partial Content
      error_string =
        "Your payment was partially approved. Further action is required.";
      error_code = "reenter_transaction";
      error_type = "api_error";
      break;

    case "21":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an issue processing your payment. Please try again later.";
      error_code = "no_action_taken";
      error_type = "api_error";
      break;

    case "25":
      http_code = 400; // Bad Request
      error_string =
        "Your payment was declined. Please check the details and try again.";
      error_code = "unable_to_locate_record";
      error_type = "invalid_request_error";
      break;

    case "28":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an issue processing your payment. Please try again later.";
      error_code = "file_not_available";
      error_type = "api_error";
      break;

    case "41":
      http_code = 200; // OK
      error_string =
        "Your card is lost. Please contact your bank to report the lost card.";
      error_code = "lost_card_pick_up";
      error_type = "api_error";
      break;

    case "43":
      http_code = 200; // OK
      error_string =
        "Your card is stolen. Please contact your bank to report the stolen card.";
      error_code = "stolen_card_pick_up";
      error_type = "api_error";
      break;

    case "51":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined due to insufficient funds. Please use a different card.";
      error_code = "insufficient_funds";
      error_type = "card_error";
      break;

    case "52":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. No checking account found.";
      error_code = "no_checking_account";
      error_type = "card_error";
      break;

    case "53":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. No savings account found.";
      error_code = "no_savings_account";
      error_type = "card_error";
      break;

    case "54":
      http_code = 403; // Forbidden
      error_string = "Your card has expired. Please use a different card.";
      error_code = "expired_card";
      error_type = "card_error";
      break;

    case "55":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined due to an incorrect PIN. Please try again.";
      error_code = "incorrect_pin";
      error_type = "card_error";
      break;

    case "57":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Transaction not permitted—card.";
      error_code = "transaction_not_permitted_card";
      error_type = "card_error";
      break;

    case "58":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Transaction not permitted—terminal.";
      error_code = "transaction_not_permitted_terminal";
      error_type = "card_error";
      break;

    case "59":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined due to suspected fraud. Please contact your bank.";
      error_code = "suspected_fraud";
      error_type = "card_error";
      break;

    case "61":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Exceeds approval amount limit.";
      error_code = "exceeds_approval_limit";
      error_type = "card_error";
      break;

    case "62":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Invalid/restricted service code.";
      error_code = "invalid_service_code";
      error_type = "card_error";
      break;

    case "63":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined due to a security violation. Please contact your bank.";
      error_code = "security_violation";
      error_type = "card_error";
      break;

    case "64":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Transaction does not fulfill AML requirement.";
      error_code = "aml_requirement_not_fulfilled";
      error_type = "card_error";
      break;

    case "65":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. Exceeds withdrawal limit.";
      error_code = "exceeds_withdrawal_limit";
      error_type = "card_error";
      break;

    case "70":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. PIN data required.";
      error_code = "pin_data_required";
      error_type = "card_error";
      break;

    case "75":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Allowable number of PIN entry tries exceeded.";
      error_code = "pin_entry_tries_exceeded";
      error_type = "card_error";
      break;

    case "76":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. Unsolicited reversal.";
      error_code = "unsolicited_reversal";
      error_type = "card_error";
      break;

    case "78":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. Blocked, first use.";
      error_code = "blocked_first_use";
      error_type = "card_error";
      break;

    case "79":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. Already reversed.";
      error_code = "already_reversed";
      error_type = "card_error";
      break;

    case "82":
      http_code = 403; // Forbidden
      error_string =
        "Your payment was declined. Negative CAM, dCVV, iCVV, or CVV results.";
      error_code = "negative_cvv_results";
      error_type = "card_error";
      break;

    case "85":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. No reason to decline.";
      error_code = "no_reason_to_decline";
      error_type = "card_error";
      break;

    case "86":
      http_code = 403; // Forbidden
      error_string = "Your payment was declined. Cannot verify PIN.";
      error_code = "cannot_verify_pin";
      error_type = "card_error";
      break;

    case "91":
      http_code = 503; // Service Unavailable
      error_string =
        "There was an issue processing your payment. Please try again later.";
      error_code = "issuer_unavailable";
      error_type = "api_error";
      break;

    case "92":
      http_code = 503; // Service Unavailable
      error_string =
        "There was an issue processing your payment. Please try again later.";
      error_code = "unable_to_route_transaction";
      error_type = "api_error";
      break;

    case "93":
      http_code = 503; // Service Unavailable
      error_string =
        "There was an issue processing your payment. Please try again later.";
      error_code = "transaction_violation_of_law";
      error_type = "api_error";
      break;

    case "96":
      http_code = 500; // Internal Server Error
      error_string =
        "There was an internal server error. Please try again later or contact support.";
      error_code = "system_error";
      error_type = "api_error";
      break;

    case "97":
      http_code = 400; // Bad Request
      error_string =
        "Your payment was declined. Please check the CVV and try again.";
      error_code = "invalid_cvv";
      error_type = "card_error";
      break;

    case "1A":
      http_code = 401; // Unauthorized
      error_string =
        "Additional customer authentication is required for this payment.";
      error_code = "additional_authentication_required";
      error_type = "authentication_error";
      break;

    case "R0":
    case "R1":
      http_code = 200; // OK
      error_string =
        "Your recurring charge has been stopped at customer request.";
      error_code = "recurring_stopped_customer_request";
      error_type = "api_error";
      break;

    default:
      http_code = 500; // Internal Server Error
      error_string =
        "There was an internal server error. Please try again later or contact support.";
      error_code = "internal_server_error";
      error_type = "api_error";
  }
  return [http_code, error_string, error_code, error_type];
}

export { num_code };
