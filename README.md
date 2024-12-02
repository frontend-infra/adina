# Adina

**Ad**aptively **In**lined **A**ssets

Adina is a set of plug-in files that makes every client-side rendered app load in an incredible speed.

## How Does It Work?

1. The browser requests a page.
2. A serverless worker inlines all the relevant assets of the requested page into the HTML document response.
3. In the browser, a script extractes all inlined assets and hands them over to a service worker which caches them.
4. Upon the next visit, the service worker requests the page while also attaching an `X-Cached` header containing all of its cached asssets.
5. The serverless worker then responds with a `304 Not Modified` status code if nothing has changed, or adaptively inlines the new (or missing) assets right into the HTML document reponse.

In addition, all fetch requests are preloaded right away.

The following network snapshots help visualize the impact of Adina on the load waterfall:

_No Adina (code-splitting only)_
![No Adina](images/no-adina.png)

_Adina_
![Adina](images/adina.png)

_Adina Repeated Load (full cache)_
![Adina Repeated Load](images/adina-repeated-load.png)

Adina can also be used in static way, without a serverless worker:

_Adina (Static)_
![Adina (Static)](images/adina-static.png)
