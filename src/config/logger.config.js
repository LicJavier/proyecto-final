import log4js from 'log4js';

const logger = log4js.getLogger('default');

log4js.configure({
    appenders: { 
        console: { type: "console" },
        warn: { type: 'file', filename: './logs/warn.log' },
        error: { type: 'file', filename: './logs/error.log' },
        loggerConsole: { type: 'logLevelFilter' , appender: 'console' , level: 'info'},
        loggerWarn: { type: 'logLevelFilter' , appender: 'warn' , level: 'warn'},
        loggerError: { type: 'logLevelFilter' , appender: 'error' , level: 'error'}
},
    categories: { 
        default: { appenders: [ "loggerConsole", "loggerWarn" , "loggerError" ], level: "all" },
        
    }
});

export default logger;