# stripe-like

"stripe-like" is a wrapper that serves as an intermediary layer between developers and the OneLink API. This wrapper simplifies the accessibility and processing of data returned from OneLink, providing a more user-friendly interface for seamless integration and interaction.

## Interacting with the API

First obtain your token and salt from the [portal](https://portal.onelink.bz). 

`stripe-like` is already hosted on [Fly](https://fly.io) as `https://stripe-like.fly.dev`. You can also [self-host](## Self-Hosting).

The API currently contains one route. This route is named `v1/charges`. Here's an example of how you'd go about using it using JavaScript's fetch:

```ts
const accessKey = `${ONELINK_TOKEN}:${ONELINK_SALT}`; // Replace with your token and salt
const requestBody = {
	"cardholder": "JOHN DOE",
	"card_number": "4747 4747 4747 4747",
	"expires": "06/27",
	"csc": "456",
	"amount": "5.50" // Any amount less than 1 will be rejected and return a HTTP 400
};

const r = await fetch("https://stripe-like.fly.dev", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${accessKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
 
});

if (r.ok) {
  const jsonData = await r.json();
  console.log(jsonData);
} else {
  console.error(`Failed to fetch data. Status code: ${r.status}`);
}
```

And in cURL:

```bash
ONELINK_TOKEN="your_token"
ONELINK_SALT="your_salt"

curl -X POST https://stripe-like.fly.dev \
  -H "Authorization: Bearer $ONELINK_TOKEN:$ONELINK_SALT" \
  -H "Content-Type: application/json" \
  -d '{
    "cardholder": "JOHN DOE",
    "card_number": "4747 4747 4747 4747",
    "expires": "06/27",
    "csc": "456",
    "amount": "5.50"
  }'
```

### Example of response data (on error)

`stripe-like` parses the data returned by the response given by OneLink and breaks it down into a parseable object:
```json
{
	"msg": "15: NO SUCH ISSUER", // We start off by using a regular expression to split the number off of the string and match it to a string. We 
	"refnumber": "08ML5B54PA8HL7DJ8ND" // Also use the reference ID of the transaction inside of the object
}
```

The result is the following

```json
{
	"reference_id": "08PL5BJH4Z6KUV40W8W", // The transaction's reference ID
	"error": { // The error object
		"numeric_code": 15, // The numeric code
		"doc_url": "https://stripe.com/docs/error-codes/no-such-issuer", // Supporting documentation on further description of the error
		"error_string": "Your payment was declined. Please check with your bank or use a different card.", // A short/brief description of the error (Which may be used in, say, a frontend or application)
		"error_code": "no_such_issuer", // An error code of the exact error that occured
		"error_type": "invalid_request_error", // The classification of the error type
		"http_code": 404 // The HTTP code returned by this request (which is mirrored from the HTTP status returned in the response itself)
	}
}
```
You can find and edit the strings returned by this in the file [numeric_code.ts](https://github.com/AlexDev404/stripe-like/blob/master/src/api/strings/numeric_code.ts)


### Example of response data (on success)

Currently, there is not much data returned on success. The following data is returned on success:

```json
{
	"reference_id": "08PL5BJH4Z6KUV40W8W", // The transaction's reference ID
}
```

## Self-Hosting

You can self-host `stripe-like` on another server somewhere or locally by doing the following:

1. Clone this repository. (You can use `git clone`)
     1. `git clone https://github.com/AlexDev404/stripe-like.git`
2. Install the depencies
     1. `npm install`
3. Run the server
     1. `npm start`

You can then start making requests.

