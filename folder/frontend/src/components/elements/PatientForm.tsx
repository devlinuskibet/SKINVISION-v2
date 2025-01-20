import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
export default function PatientForm() {
    const patientSchema = z.object({
        name: z.string({
            message: "Patient name is requiired"
        }), 
        location: z.string({
            message: "Patient location is required"
        }),
        age: z.string({
            message: "Please provide the age"
        }).optional()
    }) 
    const form = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            name: "", 
            location: "",
            age: ""
        }
    })
    const onSubmit = () => {}
  return (
      <div className="w-full h-full p-3">
          <Form {...form}>
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg">
                          Patient Form
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                          <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Enter your name" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Location</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Enter your location" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="age"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Username</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Enter your age" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />


                          <Button type="submit">Submit</Button>
                      </form>
                  </CardContent>
              </Card>
          </Form>

      </div>
  )
}
