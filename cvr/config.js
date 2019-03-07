/**
 * CoverCouch 0.1.5 configuration
 * Created by ermouth on 18.01.15.
 */

module.exports = function (runtime) {
  return {

    server: {
      mount: "/couchdb",          // Mount path, no trailing slash
      port: 8000,                 // Port
      maxpost: 50 * 1024 * 1024,  // Max size of POST request

      rater: {                    // Request rate locker
        all: {                    // Total requests limit
          interval: 2,            // Seconds, collect interval
          limit: 300              // Max requests per interval
        },
        ip: {                     // Per-ip requests limit
          interval: 10,
          limit: 100
        }
      }
    },

    couch: {
      url: process.env.URL || "http://127.0.0.1:5984",                   // Couch URL
      nano: process.env.NANO || "http://login:pass@127.0.0.1:5984",      // Couch URL with admin login:pass
      users: "_users",            // Users bucket
      maxIdLength: 250,           // Max _id length
      renewSessionInterval:300,   // Seconds between subsequent _session request
      preload: [                  // Buckets to preload and to insert acl ddoc if none
        "fl_0_remote",
      ]
    },

    workers: {
      "count": 1,                 // Total threads
      "reloadAt": 4,              // Hour all threads are restarted
      "reloadOverlap": 30e3,      // Gap between restarts of simultaneous threads
      "killDelay": 2e3            // Delay between shutdown msg to worker and kill, ms
    },

    // CORS headers
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Expose-Headers": "Content-Type, Server",
      "Access-Control-Allow-Headers": "Content-Type, Server, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,HEAD",
      "Access-Control-Max-Age": "86400",
      "X-Powered-By": "CoverCouch 0.1.0"
    },

    // CORS domains, like "http://xxx.xxx": true
    origins: {"http://localhost:3003": true}
  }
}