import { Request, Response } from "express";
import { get_authorization } from "../../utility/Authentication";
import iwe_strings, { ErrorFormat } from "../../strings";
import { num_code } from "../../strings/numeric_code";

async function main(req: Request, res: Response) {
  const auth = get_authorization(req);
  if (!auth) return res.sendStatus(403);
  // Split the auth string into the two parts separated by the colon ":" character
  const [jwt, salt] = auth.split(":");
  const { cardholder, card_number, expires, csc, amount } = req.body;
  try {
    const r = await fetch("https://api.onelink.bz/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${onelink_token}`, // I wish, lol
      },
      body: JSON.stringify({
        token: jwt,
        salt: salt,
        nameOnCard: cardholder,
        cardNumber: card_number,
        expirationDate: expires,
        ccv: csc, // 'Card Security Code'
        amount: amount,
      }),
    });
    if (!r.ok) {
      try {
        const response = await r.json();
        return res
          .status(500)
          .json(ErrorFormat(response.msg, 500, undefined, "api_error"));
      } catch {
        return res
          .status(500)
          .json(
            ErrorFormat(
              iwe_strings.Generic.EINTERNALERROR,
              500,
              undefined,
              "api_error"
            )
          );
      }
    }
    const body = await r.text();
    if (!body || (body && body === "")) {
      return res
        .status(500)
        .json(
          ErrorFormat(
            "The payment provider is currently experiencing issues. Please try again later.",
            500,
            undefined,
            "api_error"
          )
        );
    }
    // @remind Remove this second condition after bro implements something better
    const response = await r.json();
    // console.log(response);
    if (
      !response.msg ||
      (response.msg && response.msg !== "success") // Check for a numeric code
    ) {
      const error = response.msg ?? iwe_strings.Generic.EINTERNALERROR;
      let numeric_code = JSON.parse(error.split(":")[0].trim());
      // const error_string = error.split(":")[1]
      //   ? error.split(":")[1].trim()
      //   : numeric_code;

      if (isNaN(parseInt(numeric_code))) numeric_code = null; // Remove the numeric code if it isn't an actual numeric value
      let [http_code, error_string, error_code, error_type] =
        num_code(numeric_code);

      return res.status(http_code as number).json({
        tracking_id: response.refnumber,
        error: {
          numeric_code,
          doc_url: `https://stripe.com/docs/error-codes/${(
            error_code as string
          ).replace(/_/g, "-")}`,
          error_string,
          error_code,
          error_type,
          http_code,
        },
      });
    }
    // Return the refnumber as the tracking_id
    res.sendStatus(200).json({ tracking_id: response.refnumber });
  } catch (error) {
    return res
      .status(500)
      .json(
        ErrorFormat(
          error.message ?? iwe_strings.Generic.EINTERNALERROR,
          500,
          undefined,
          "api_error"
        )
      );
  }
}

export { main };
