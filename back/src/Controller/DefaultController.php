<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use App\Entity\Avis;
use App\Repository\AvisRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DefaultController extends AbstractController
{
    /**
     * @Route("signup", name="api_user")
     */
    public function SetUser(Request $request, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $array = [];
        $array = json_decode($request->getContent(), true);

        $user = new User();
        $user->setFirstName($array['firstName']);
        $user->setLastName($array['lastName']);
        $user->setEmail($array['email']);
        $user->setPassword($array['password']);
        $user->setApiToken(bin2hex(random_bytes(80)));
        $emailError = $validator->validate($user);

        if (count($emailError) > 0) {
            $errorList = [];
            foreach ($emailError as $key => $value) {
                array_push($errorList, $value->getMessage());
            }
            return new JsonResponse($errorList);
        }
        $em->persist($user);
        $em->flush();
        return new JsonResponse('Bienvenue !');
    }

    /**
     * @Route("/products", name="products_list")
     */
    public function list(ProductRepository $productRepository)
    {
        $products = $productRepository->findAll();
        $response = array();

        if (empty($products)) {
            return new JsonResponse('Aucun item', 200);
        }
        foreach ($products as $product) {
            $response[] = array(
                'id' => $product->getId(),
                'sku' => $product->getSku(),
                'title' => $product->getTitle(),
                'description' => $product->getDescription(),
                'prix' => $product->getPrix()
            );
        }
        return new JsonResponse(array_reverse($response));
    }

    /**
     * @Route("/products/{id}", name="product")
     */
    public function getOne(string $id, EntityManagerInterface $em)
    {
        $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->find($id);

        if (!$product) {
            return new JsonResponse(['Error' => 'Product not found']);
        }

        $response = [
            'id' => $product->getId(),
            'sku' => $product->getSku(),
            'description' => $product->getDescription(),
            'title' => $product->getTitle(),
            'prix' => $product->getPrix(),
        ];

        return new JsonResponse($response);
    }

    /**
     * @Route("/panier", name="panier")
     */
    public function getPanier(Request $request)
    {
        $array = array();
        $array = json_decode($request->getContent(), true);


        $response = [];
        for ($i = 0; $i < count($array); $i++) {

            $product = $this->getDoctrine()
                ->getRepository(Product::class)
                ->find($array[$i]);

            $response[$i] = [
                'id' => $product->getId(),
                'sku' => $product->getSku(),
                'description' => $product->getDescription(),
                'title' => $product->getTitle(),
                'prix' => $product->getPrix(),
            ];
        }

        return new JsonResponse($response);
    }

    /**
     * @Route("/login", name="Check")
     */
    public function checkLog(Request $request, UserRepository $userRepository)
    {
        $array = array();
        $array = json_decode($request->getContent(), true);
        $account = $userRepository->findBy(array('email' => $array['email']));
        if (!$account) return new JsonResponse(['error' => 'User not found']);
        $password = $this->getDoctrine()
            ->getRepository(User::class)
            ->findBy(array('password' => $array['password']));
        if (!$password) return new JsonResponse(['error' => 'Wrong password']);

        return new JsonResponse([
            'token' => $account[0]->getApiToken(),
            'id_user' => $account[0]->getId(),
            'success' => 'Vous êtes connecter'
        ]);
    }

    /**
     * @Route("/add/avis", name="AddAvis")
     */
    public function addAvis(Request $request, EntityManagerInterface $em)
    {
        $array = array();
        $array = json_decode($request->getContent(), true);

        $avis = new Avis();
        $avis->setAvis($array['avis']);
        $avis->setNote(intval($array['note']));
        $avis->setIdUser($array['id_user']);
        $avis->setIdProduct($array['product']);
        $em->persist($avis);
        $em->flush();
        return new JsonResponse(['success' => 'Done !']);
    }

    /**
     * @Route("/avis/{id}", name="Avis")
     */
    public function getAvis(int $id, AvisRepository $avisRepository, UserRepository $userRepository)
    {
        $avis = $avisRepository->findBy(array('id_product' => $id));
        $array = [];

        foreach ($avis as $value) {
            $username = $userRepository->findBy(array('id' => $value->getIdUser()));
            $array[] = array(
                'lastname' => $username[0]->getLastName(),
                'firstname' => $username[0]->getFirstname(),
                'avis' => $value->getAvis(),
                'note' => $value->getNote(),
            );
        }

        return new JsonResponse($array);
    }
    /**
     * @Route("/add/product", name="Add_product")
     */
    public function addProduct(EntityManagerInterface $em, Request $request, ProductRepository $productRepository)
    {
        $array = array();
        $array = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setIdUser($array['id_user']);
        $product->setPrix($array['price']);
        $product->setDescription($array['description']);
        $product->setTitle($array['title']);
        $product->setSku(mt_rand(100, 100000));
        $em->persist($product);
        $em->flush();

        return new JsonResponse($array);
    }
}
