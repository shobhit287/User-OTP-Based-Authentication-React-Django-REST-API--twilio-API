import { Button, Flex } from 'antd';
import { Link} from 'react-router-dom';

function Index(props) {
   
    return (
        <div>
        
                    <h1>User Authentication System</h1>
                    <Flex align="center" justify="center" gap="small" wrap="wrap">
                        <Link to='login'><Button type="primary">Login</Button></Link>
                        <Link to='signup'><Button type="primary">Signup</Button></Link>
                    </Flex>
           
        </div>
    );
}

export default Index;
