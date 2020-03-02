<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Product;


class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        for ($i = 0; $i < 20; $i++) {
            $product = new Product();
            $product->setSku(mt_rand(100,100000));
            $product->setTitle('product '.$i);
            $product->setPrix(mt_rand(10, 100));
            $product->setDescription('zeubi');
            $product->setIdUser(8);
            $manager->persist($product);
        }

        $manager->flush();
    }
}
