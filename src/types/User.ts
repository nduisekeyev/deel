import Address from "./Address";
import Company from "./Company";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Pick<Address, "street" | "suite" | "city">;
  phone?: string;
  company: Pick<Company, "name">;
};

export default User;
