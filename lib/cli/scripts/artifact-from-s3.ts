#!/usr/bin/env node

/*!
 * @license
 * Copyright © 2005-2023 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { argv, exit } from 'node:process';
import { exec } from './exec';
import { logger } from './logger';
import program from 'commander';

/**
 * Perform a test
 *
 * @param output output path
 */
function test(output: string) {
    const response = exec('test !', [`-d ${output} && mkdir ${output}`], {});
    logger.info(response);
}

/**
 * Copy AWS S3
 *
 * @param artifact artifact name
 */
function awsCp(artifact: string) {
    logger.info(`aws s3 cp ${artifact}`);
    const response = exec(`aws s3 cp  ${artifact}`, [`./s3-artifact.tmp ${artifact}`], {});
    logger.info(response);
}

/**
 * Zip artifact
 *
 * @param output output name
 */
function zipArtifact(output: string) {
    logger.info(`Perform zip artifact ${output}`);
    const response = exec('tar', ['-xvf', `./s3-artifact.tmp`, '-C ' + program.output], {});
    logger.info(response);
}

/**
 * Artifact from S3 command
 */
export default function main() {
    program
        .version('0.1.0')
        .requiredOption('-a, --artifact [type]', ' path to the s3 artifact (tar.bz2) to download and extract')
        .requiredOption('-o, --output [type]', 'directory to extract the archive to')
        .parse(argv);

    if (argv.includes('-h') || argv.includes('--help')) {
        program.outputHelp();
        return;
    }

    if (!program.artifact || program.artifact === '' || !program.output || program.output === '') {
        exit(1);
    } else if (program.artifact !== '' || program.output !== '') {
        zipArtifact(program.artifact);
        awsCp(program.output);
    }

    test(program.output);
    awsCp(program.artifact);
    zipArtifact(program.output);
}
