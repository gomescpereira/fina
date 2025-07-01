import {  WebTracerProvider } from '@opentelemetry/sdk-trace-web';

import {  defaultResource, resourceFromAttributes } from '@opentelemetry/resources';

import {  BatchSpanProcessor,  ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
//import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {  ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION  }  from '@opentelemetry/semantic-conventions';


export function initTelemetry() {

  const resource = defaultResource().merge(
  resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'jornada_react',
    [ATTR_SERVICE_VERSION]: '0.1.0',
  }),
);

  // const resource = resourceFromAttributes({
  //   [ATTR_SERVICE_NAME]: 'jornada_react',
  //   [ATTR_SERVICE_VERSION]: '1.0.0',       
             
  // });

 const exporter = new ConsoleSpanExporter();
 const processor = new BatchSpanProcessor(exporter);

const provider = new WebTracerProvider({
  resource: resource,
  spanProcessors: [processor],
});

  // const provider = new WebTracerProvider({
  //   resource: resource,
  // });

  // Configure o endpoint do seu coletor OpenTelemetry
  const collectorOptions = {
    url: 'http://192.168.0.20:4318/v1/traces', // Ajuste esta URL conforme necessário
  };
  
  
  // Registre o provedor
  provider.register();

  // Registre instrumentações automáticas
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      // Adicione outras instrumentações conforme necessário
    ],
  });

  return provider;
}
