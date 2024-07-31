import {
    BarChartDataTransformer,
    type BarChartConfig,
    type ResultRow,
    type SqlColumn,
} from '@lightdash/common';
import { useMemo } from 'react';
import { useAsync } from 'react-use';
import { SqlRunnerResultsTransformerFE } from './SqlRunnerResultsTransformerFE';

export const useBarChart = (
    rows: ResultRow[],
    columns: SqlColumn[],
    config: BarChartConfig,
) => {
    const transformer = useMemo(
        () =>
            new SqlRunnerResultsTransformerFE({
                rows,
                columns,
            }),
        [rows, columns],
    );
    const barChart = useMemo(
        () =>
            new BarChartDataTransformer({
                transformer,
            }),
        [transformer],
    );

    return useAsync(
        async () => barChart.getEchartsSpec(config.fieldConfig, config.display),
        [config, barChart],
    );
};