import { Box, Grid } from "@mui/material";
import { ConductorAutocompleteVariables } from "components/FlatMapForm/ConductorAutocompleteVariables";
import ConductorSelect from "components/ui/inputs/ConductorSelect";
import { path as _path } from "lodash/fp";
import { updateField } from "utils/fieldHelpers";
import { ConductorCacheOutput } from "./ConductorCacheOutputForm";
import { Optional } from "./OptionalFieldForm";
import TaskFormSection from "./TaskFormSection";
import { TaskFormProps } from "./types";

const connectionIdPath = "inputParameters.connectionId";
const invoiceIdsPath = "inputParameters.invoiceIds";
const typePath = "inputParameters.type";

export const ZohoBooksFetchTaskForm = ({ task, onChange }: TaskFormProps) => {
  const type = _path(typePath, task) ?? "bills";

  return (
    <Box width="100%">
      <TaskFormSection
        accordionAdditionalProps={{ defaultExpanded: true }}
        title="Zoho Books"
      >
        <Grid container spacing={3} pt={3}>
          <Grid size={12}>
            <ConductorAutocompleteVariables
              fullWidth
              value={_path(connectionIdPath, task)}
              onChange={(changes) =>
                onChange(updateField(connectionIdPath, changes, task))
              }
              label="Connection ID"
              inputProps={{
                tooltip: {
                  title: "Connection ID",
                  content:
                    "Stored Zoho Books connection ID, or a workflow input expression.",
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <ConductorAutocompleteVariables
              fullWidth
              value={_path(invoiceIdsPath, task)}
              onChange={(changes) =>
                onChange(updateField(invoiceIdsPath, changes, task))
              }
              label="Invoice IDs"
              inputProps={{
                tooltip: {
                  title: "Invoice IDs",
                  content:
                    "List of Zoho Books document IDs, or a workflow input expression. Use Type to choose whether these IDs are bills or invoices.",
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <ConductorSelect
              fullWidth
              label="Type"
              value={type}
              items={[
                { label: "Bills", value: "bills" },
                { label: "Invoices", value: "invoices" },
              ]}
              onChange={(event) =>
                onChange(updateField(typePath, event.target.value, task))
              }
              tooltip={{
                title: "Type",
                content:
                  "Select bills to fetch Zoho Books bills, or invoices to fetch Zoho Books invoices.",
              }}
            />
          </Grid>
        </Grid>
      </TaskFormSection>
      <TaskFormSection>
        <Box display="flex" flexDirection="column" gap={3}>
          <ConductorCacheOutput onChange={onChange} taskJson={task} />
          <Optional onChange={onChange} taskJson={task} />
        </Box>
      </TaskFormSection>
    </Box>
  );
};
