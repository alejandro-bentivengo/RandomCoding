import java.util.Arrays;


/**
 * PermMissingElem class to solve codility problem
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/3-time_complexity/perm_missing_elem/">https://app.codility.com/programmers/lessons/3-time_complexity/perm_missing_elem/</a>
 */
public class PermMissingElem {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        System.out.print(PermMissingElem.solution(new int[]{2, 3, 1, 5}));
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * @param A array with values
     * @return first value that is missing in the array
     */
    public static int solution(int[] A) {
        if (A.length != 0) {
            Arrays.sort(A);
            int initialValue = 1;
            int index = 0;
            for (int i = initialValue; i <= A[A.length - 1]; i++, index++) {
                if (A[index] != i) {
                    return i;
                } else if (A[index] == A[A.length - 1]) {
                    return i + 1;
                }
            }
            return 1;
        } else {
            return 1;
        }
    }
}
