// flascelles
//
// This is a Postman Test script in which I post a notification to a slack channel on the first time I encounter
// a specific error status (in this case 403)
//
var notified = pm.environment.get("notified");
if (pm.info.iteration === 0) {
    notified = false;
    pm.environment.set("notified", notified);
}

if (pm.response.code === 200) {
    console.log("200");
} else if (pm.response.code === 403) {
    if (notified) {
        // don't notify even though we keep getting 403
        // maybe could implement counter that notifies slack channel
        // when you get to 100
    } else {
        pm.sendRequest({
          url:  "https://hooks.slack.com/services/[your_slack_webhook_here]",
          method: 'POST',
          header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: {
            mode: 'json',
            raw: '{"text" : "this is the message that you are posting on slack"}'
          }
        }, function (err, res) {
        console.log("res " + res)
        });
        notified = true;
        pm.environment.set("notified", notified);
    }
} else {
    console.log("Unexpected " + pm.response.code);
}
