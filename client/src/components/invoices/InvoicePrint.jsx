import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const InvoicePrint = ({ generatedInvoice }) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Generated Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Invoice Detail
                                </TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Invoice Number
                                </TableCell>
                                <TableCell>
                                    {generatedInvoice.invoiceNumber}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Date
                                </TableCell>
                                <TableCell>{generatedInvoice.date}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Patient Name
                                </TableCell>
                                <TableCell>
                                    {generatedInvoice.patientName}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Prescribed Medicine
                                </TableCell>
                                <TableCell>
                                    {generatedInvoice.medicine}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Status</TableCell>
                                <TableCell>{generatedInvoice.status}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="font-medium">
                                    Amount
                                </TableCell>
                                <TableCell>
                                    ${generatedInvoice.amount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Days to Take Medicine
                                </TableCell>
                                <TableCell>
                                    {generatedInvoice.daysToTake} days
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Next Follow-up Date
                                </TableCell>
                                <TableCell>
                                    {format(
                                        generatedInvoice.nextFollowUp,
                                        "PPP"
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => window.print()}>
                        Print Invoice
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default InvoicePrint;
