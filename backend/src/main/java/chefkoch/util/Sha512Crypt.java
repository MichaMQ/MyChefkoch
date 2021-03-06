package chefkoch.util;

import java.security.MessageDigest;

/**
 * This class defines a method, {@link
 * Sha512Crypt#Sha512_crypt(java.lang.String, java.lang.String, int)
 * Sha512_crypt()}, which takes a password and a salt string and
 * generates a Sha512 encrypted password entry.
 *
 * This class implements the new generation, scalable, SHA512-based
 * Unix 'crypt' algorithm developed by a group of engineers from Red
 * Hat, Sun, IBM, and HP for common use in the Unix and Linux
 * /etc/shadow files.
 *
 * The Linux glibc library (starting at version 2.7) includes support
 * for validating passwords hashed using this algorithm.
 *
 * The algorithm itself was released into the Public Domain by Ulrich
 * Drepper &lt;drepper@redhat.com&gt;.  A discussion of the rationale and
 * development of this algorithm is at
 *
 * http://people.redhat.com/drepper/sha-crypt.html
 *
 * and the specification and a sample C language implementation is at
 *
 * http://people.redhat.com/drepper/SHA-crypt.txt
 */

public final class Sha512Crypt {
    static private final String sha512_salt_prefix = "$6$";

    static private final String sha512_rounds_prefix = "rounds=";

    static private final int SALT_LEN_MAX = 16;

    static private final int ROUNDS_DEFAULT = 5000;

    static private final int ROUNDS_MIN = 1000;

    static private final int ROUNDS_MAX = 999999999;

    static private final String SALTCHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    static private final String itoa64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    static private MessageDigest getSHA512() {
        try {
            return MessageDigest.getInstance("SHA-512");
        } catch (java.security.NoSuchAlgorithmException ex) {
            throw new RuntimeException(ex);
        }
    }

    /**
     * This method actually generates an
     * Sha512 crypted password hash from a plaintext password and a
     * salt.
     *
     * <p>The resulting string will be in the form '$6$&lt;rounds=n&gt;$&lt;salt&gt;$&lt;hashed mess&gt;</p>
     *
     * @param keyStr Plaintext password
     *
     * @param saltStr An encoded salt/roundes which will be consulted to determine the salt
     * and round count, if not null
     *
     * @param roundsCount If this value is not 0, this many rounds will
     * used to generate the hash text.
     *
     * @return The Sha512 Unix Crypt hash text for the keyStr
     */

    public static final String Sha512_crypt(String keyStr, String saltStr, int roundsCount) {
        MessageDigest ctx = getSHA512();
        MessageDigest alt_ctx = getSHA512();

        byte[] alt_result;
        byte[] temp_result;
        byte[] p_bytes = null;
        byte[] s_bytes = null;
        int cnt, cnt2;
        int rounds = ROUNDS_DEFAULT; // Default number of rounds.
        StringBuffer buffer;

        /* -- */

        if (saltStr != null) {
            if (saltStr.startsWith(sha512_salt_prefix)) {
                saltStr = saltStr.substring(sha512_salt_prefix.length());
            }

            if (saltStr.startsWith(sha512_rounds_prefix)) {
                String num = saltStr.substring(sha512_rounds_prefix.length(), saltStr.indexOf('$'));
                int srounds = Integer.valueOf(num).intValue();
                saltStr = saltStr.substring(saltStr.indexOf('$') + 1);
                rounds = Math.max(ROUNDS_MIN, Math.min(srounds, ROUNDS_MAX));
            }

            if (saltStr.length() > SALT_LEN_MAX) {
                saltStr = saltStr.substring(0, SALT_LEN_MAX);
            }
        } else {
            java.util.Random randgen = new java.util.Random();
            StringBuffer saltBuf = new StringBuffer();

            while (saltBuf.length() < 16) {
                int index = (int) (randgen.nextFloat() * SALTCHARS.length());
                saltBuf.append(SALTCHARS.substring(index, index + 1));
            }

            saltStr = saltBuf.toString();
        }

        if (roundsCount != 0) {
            rounds = Math.max(ROUNDS_MIN, Math.min(roundsCount, ROUNDS_MAX));
        }

        byte[] key = keyStr.getBytes();
        byte[] salt = saltStr.getBytes();

        ctx.reset();
        ctx.update(key, 0, key.length);
        ctx.update(salt, 0, salt.length);

        alt_ctx.reset();
        alt_ctx.update(key, 0, key.length);
        alt_ctx.update(salt, 0, salt.length);
        alt_ctx.update(key, 0, key.length);

        alt_result = alt_ctx.digest();

        for (cnt = key.length; cnt > 64; cnt -= 64) {
            ctx.update(alt_result, 0, 64);
        }

        ctx.update(alt_result, 0, cnt);

        for (cnt = key.length; cnt > 0; cnt >>= 1) {
            if ((cnt & 1) != 0) {
                ctx.update(alt_result, 0, 64);
            } else {
                ctx.update(key, 0, key.length);
            }
        }

        alt_result = ctx.digest();

        alt_ctx.reset();

        for (cnt = 0; cnt < key.length; ++cnt) {
            alt_ctx.update(key, 0, key.length);
        }

        temp_result = alt_ctx.digest();

        p_bytes = new byte[key.length];

        for (cnt2 = 0, cnt = p_bytes.length; cnt >= 64; cnt -= 64) {
            System.arraycopy(temp_result, 0, p_bytes, cnt2, 64);
            cnt2 += 64;
        }

        System.arraycopy(temp_result, 0, p_bytes, cnt2, cnt);

        alt_ctx.reset();

        for (cnt = 0; cnt < 16 + (alt_result[0] & 0xFF); ++cnt) {
            alt_ctx.update(salt, 0, salt.length);
        }

        temp_result = alt_ctx.digest();

        s_bytes = new byte[salt.length];

        for (cnt2 = 0, cnt = s_bytes.length; cnt >= 64; cnt -= 64) {
            System.arraycopy(temp_result, 0, s_bytes, cnt2, 64);
            cnt2 += 64;
        }

        System.arraycopy(temp_result, 0, s_bytes, cnt2, cnt);

        /* Repeatedly run the collected hash value through SHA512 to burn
           CPU cycles.  */

        for (cnt = 0; cnt < rounds; ++cnt) {
            ctx.reset();

            if ((cnt & 1) != 0) {
                ctx.update(p_bytes, 0, key.length);
            } else {
                ctx.update(alt_result, 0, 64);
            }

            if (cnt % 3 != 0) {
                ctx.update(s_bytes, 0, salt.length);
            }

            if (cnt % 7 != 0) {
                ctx.update(p_bytes, 0, key.length);
            }

            if ((cnt & 1) != 0) {
                ctx.update(alt_result, 0, 64);
            } else {
                ctx.update(p_bytes, 0, key.length);
            }

            alt_result = ctx.digest();
        }

        buffer = new StringBuffer(sha512_salt_prefix);

        if (rounds != 5000) {
            buffer.append(sha512_rounds_prefix);
            buffer.append(rounds);
            buffer.append("$");
        }

        buffer.append(saltStr);
        buffer.append("$");

        buffer.append(b64_from_24bit(alt_result[0], alt_result[21], alt_result[42], 4));
        buffer.append(b64_from_24bit(alt_result[22], alt_result[43], alt_result[1], 4));
        buffer.append(b64_from_24bit(alt_result[44], alt_result[2], alt_result[23], 4));
        buffer.append(b64_from_24bit(alt_result[3], alt_result[24], alt_result[45], 4));
        buffer.append(b64_from_24bit(alt_result[25], alt_result[46], alt_result[4], 4));
        buffer.append(b64_from_24bit(alt_result[47], alt_result[5], alt_result[26], 4));
        buffer.append(b64_from_24bit(alt_result[6], alt_result[27], alt_result[48], 4));
        buffer.append(b64_from_24bit(alt_result[28], alt_result[49], alt_result[7], 4));
        buffer.append(b64_from_24bit(alt_result[50], alt_result[8], alt_result[29], 4));
        buffer.append(b64_from_24bit(alt_result[9], alt_result[30], alt_result[51], 4));
        buffer.append(b64_from_24bit(alt_result[31], alt_result[52], alt_result[10], 4));
        buffer.append(b64_from_24bit(alt_result[53], alt_result[11], alt_result[32], 4));
        buffer.append(b64_from_24bit(alt_result[12], alt_result[33], alt_result[54], 4));
        buffer.append(b64_from_24bit(alt_result[34], alt_result[55], alt_result[13], 4));
        buffer.append(b64_from_24bit(alt_result[56], alt_result[14], alt_result[35], 4));
        buffer.append(b64_from_24bit(alt_result[15], alt_result[36], alt_result[57], 4));
        buffer.append(b64_from_24bit(alt_result[37], alt_result[58], alt_result[16], 4));
        buffer.append(b64_from_24bit(alt_result[59], alt_result[17], alt_result[38], 4));
        buffer.append(b64_from_24bit(alt_result[18], alt_result[39], alt_result[60], 4));
        buffer.append(b64_from_24bit(alt_result[40], alt_result[61], alt_result[19], 4));
        buffer.append(b64_from_24bit(alt_result[62], alt_result[20], alt_result[41], 4));
        buffer.append(b64_from_24bit((byte) 0x00, (byte) 0x00, alt_result[63], 2));

        /* Clear the buffer for the intermediate result so that people
           attaching to processes or reading core dumps cannot get any
           information. */

        ctx.reset();

        return buffer.toString();
    }

    private static final String b64_from_24bit(byte B2, byte B1, byte B0, int size) {
        int v = ((B2 & 0xFF) << 16) | ((B1 & 0xFF) << 8) | (B0 & 0xff);

        StringBuffer result = new StringBuffer();

        while (--size >= 0) {
            result.append(itoa64.charAt((v & 0x3f)));
            v >>>= 6;
        }

        return result.toString();
    }

    /**
     * This method tests a plaintext password against a SHA512 Unix
     * Crypt'ed hash and returns true if the password matches the hash.
     *
     * @param plaintextPass The plaintext password text to test.
     * @param sha512CryptText The hash text we're testing against.
     * We'll extract the salt and the round count from this String.
     */

    static public final boolean verifyPassword(String plaintextPass, String sha512CryptText) {
        if (!sha512CryptText.startsWith("$6$")) {
            throw new RuntimeException("Bad sha512CryptText");
        }
        String saltWithPrefix = sha512CryptText.substring(0, sha512CryptText.lastIndexOf("$"));
        return sha512CryptText.equals(Sha512_crypt(plaintextPass, saltWithPrefix, 0));
    }

    public static final boolean verifyHashTextFormat(String sha512CryptText) {
        if (!sha512CryptText.startsWith(sha512_salt_prefix)) {
            return false;
        }

        sha512CryptText = sha512CryptText.substring(sha512_salt_prefix.length());

        if (sha512CryptText.startsWith(sha512_rounds_prefix)) {
            String num = sha512CryptText.substring(sha512_rounds_prefix.length(), sha512CryptText.indexOf('$'));

            try {
                Integer.valueOf(num).intValue();
            } catch (NumberFormatException ex) {
                return false;
            }

            sha512CryptText = sha512CryptText.substring(sha512CryptText.indexOf('$') + 1);
        }

        if (sha512CryptText.indexOf('$') > (SALT_LEN_MAX + 1)) {
            return false;
        }

        sha512CryptText = sha512CryptText.substring(sha512CryptText.indexOf('$') + 1);

        for (int i = 0; i < sha512CryptText.length(); i++) {
            if (itoa64.indexOf(sha512CryptText.charAt(i)) == -1) {
                return false;
            }
        }

        return true;
    }

    /**
     * Validate our implementation using test data from Ulrich Drepper's
     * C implementation.
     */

    private static void selfTest() {
        System.out.println("Verify Password Test: "
                           + verifyPassword("Hello world!", "$6$saltstring$svn8UoSVapNtMuq1ukKS4tPQd8iKwSMHWjl/O817G3uBnIFNjnQJuesI68u4OTLiBFdcbYEdFCoEOfaS35inz1"));
        String msgs[] = {
                          "$6$saltstring", "Hello world!", "$6$saltstring$svn8UoSVapNtMuq1ukKS4tPQd8iKwSMHWjl/O817G3uBnIFNjnQJuesI68u4OTLiBFdcbYEdFCoEOfaS35inz1",
                          "$6$rounds=10000$saltstringsaltstring", "Hello world!",
                          "$6$rounds=10000$saltstringsaltst$OW1/O6BYHV6BcXZu8QVeXbDWra3Oeqh0sbHbbMCVNSnCM/UrjmM0Dp8vOuZeHBy/YTBmSK6H9qs/y3RnOaw5v.",
                          "$6$rounds=5000$toolongsaltstring", "This is just a test",
                          "$6$rounds=5000$toolongsaltstrin$lQ8jolhgVRVhY4b5pZKaysCLi0QBxGoNeKQzQ3glMhwllF7oGDZxUhx1yxdYcz/e1JSbq3y6JMxxl8audkUEm0",
                          "$6$rounds=1400$anotherlongsaltstring", "a very much longer text to encrypt.  This one even stretches over morethan one line.",
                          "$6$rounds=1400$anotherlongsalts$POfYwTEok97VWcjxIiSOjiykti.o/pQs.wPvMxQ6Fm7I6IoYN3CmLs66x9t0oSwbtEW7o7UmJEiDwGqd8p4ur1",
                          "$6$rounds=77777$short", "we have a short salt string but not a short password",
                          "$6$rounds=77777$short$WuQyW2YR.hBNpjjRhpYD/ifIw05xdfeEyQoMxIXbkvr0gge1a1x3yRULJ5CCaUeOxFmtlcGZelFl5CxtgfiAc0",
                          "$6$rounds=123456$asaltof16chars..", "a short string",
                          "$6$rounds=123456$asaltof16chars..$BtCwjqMJGx5hrJhZywWvt0RLE8uZ4oPwcelCjmw2kSYu.Ec6ycULevoBK25fs2xXgMNrCzIMVcgEJAstJeonj1",
                          "$6$rounds=10$roundstoolow", "the minimum number is still observed",
                          "$6$rounds=1000$roundstoolow$kUMsbe306n21p9R.FRkW3IGn.S9NPN0x50YhH1xhLsPuWGsUSklZt58jaTfF4ZEQpyUNGc0dqbpBYYBaHHrsX."
        };

        System.out.println("Starting Sha512Crypt tests now...");
        String result;

        for (int t = 0; t < 7; t++) {
            result = Sha512_crypt(msgs[t * 3 + 1], msgs[t * 3], 0);

            System.out.println("test " + t + " result is:" + result);
            System.out.println("test " + t + " should be:" + msgs[t * 3 + 2]);

            if (result.equals(msgs[t * 3 + 2])) {
                System.out.println("Passed well");
            } else {
                System.out.println("Failed Badly");
            }
        }
    }

    /**
     * Test rig
     */

    public static void main(String arg[]) {
        selfTest();
    }
}