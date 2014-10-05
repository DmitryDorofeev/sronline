package Users;

import constants.CodeResponses;
import org.junit.Test;

import static org.junit.Assert.*;

public class AccountServiceTest {

    @Test
    public void testRegister() throws Exception {
        AccountService accountServiceTest = new AccountService();
        UserProfile looser = new UserProfile("looser", "looser", "iamnigga");
        accountServiceTest.register(looser);
        if (accountServiceTest.login("looser", "iamniggaq", "session") != CodeResponses.OK) {
            fail("Epic fail");
        }
    }
}