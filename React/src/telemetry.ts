import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
//import { Resource } from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';


export const setupTelemetry = () => {
const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'api-service',
});

const anotherResource = resourceFromAttributes({
    'service.version': '2.0.0',
    'service.group': 'instrumentation-group'
});
const mergeResource = resource.merge(anotherResource);


  const provider = new WebTracerProvider({ mergeResource });
  
  // Create and configure OTLP exporter
  const otlpExporter = new OTLPTraceExporter({
    url: 'http://192.168.0.20:4318/v1/traces', // Update with your collector endpoint
  });
  
  // Use BatchSpanProcessor for better performance
  const spanProcessor = new BatchSpanProcessor(otlpExporter);
  //provider.addSpanProcessor(spanProcessor);
  
  // Register the provider
  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // Register instrumentations
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        // Ignore certain URLs from being instrumented
        ignoreUrls: [/localhost:8090\/sockjs-node/],
        // Add custom headers to your outgoing requests
        propagateTraceHeaderCorsUrls: [
          /.+/g, // Propagate to all URLs, for demo purposes
        ],
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /.+/g, // Propagate to all URLs, for demo purposes
        ],
      }),
    ],
  });
};
